package com.nextdoor.nextdoor.domain.post.search;

import com.nextdoor.nextdoor.domain.post.domain.Post;
import com.nextdoor.nextdoor.domain.post.exception.PostIndexException;
import com.nextdoor.nextdoor.domain.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostIndexService {
  private static final int BATCH_SIZE = 500;

  private final PostRepository postRepository;
  private final PostSearchRepository elasticSearchRepository;
  private final IndexLockService indexLockService;

  @Scheduled(cron = "0 0 3 * * *")
  @Transactional(readOnly = true)
  public void reindexAll() {
    if(!indexLockService.acquireFullIndexLock()){
      throw new PostIndexException("이미 전체 인덱싱 중입니다.");
    }

    try {
      elasticSearchRepository.deleteAll();

      int page = 0;
      long total = 0;
      Page<Post> posts = Page.empty();

      do {
        try {
          posts = postRepository.findAll(
                  PageRequest.of(page, BATCH_SIZE, Sort.by("id")));

          if (posts.isEmpty()) {
            break;
          }

          List<PostDocument> docs = posts.stream()
                  .map(this::toDocument)
                  .collect(Collectors.toList());

          elasticSearchRepository.saveAll(docs);
          total += docs.size();
          log.info("  배치 {}: {} 건 색인", page, docs.size());
          page++;
        } catch (Exception e) {
          log.error("  배치 {} 색인 중 오류: {}", page, e.getMessage(), e);
        }
      } while (posts != null && !posts.isEmpty() && !posts.isLast());

      log.info("◀◀◀ 완료: 총 {} 건 색인", total);
    } catch (Exception e) {
      log.error("전체 색인 중 오류 발생: {}", e.getMessage(), e);
    } finally {
      try {
        List<PostDocument> docs = indexLockService.processPendingIndexQueue();
        if(docs.size() > 0){
          elasticSearchRepository.saveAll(docs);
          log.info("  배치 색인 완료: {} 건 색인", docs.size());
        }
      } catch (Exception e) {
        log.error("배치 색인 중 오류 발생: {}", e.getMessage(), e);
      } finally {
        indexLockService.releaseFullIndexLock();
      }
    }
  }

  @Transactional
  public void indexSinglePost(Long postId) {
    Post post = postRepository.findById(postId)
            .orElseThrow(() -> new PostIndexException("ID가 " + postId + "인 게시물이 존재하지 않습니다."));

    PostDocument doc = toDocument(post);

    if(indexLockService.isFullIndexLocked()){
      indexLockService.addToPendingIndexQueue(doc);
      throw new PostIndexException("이미 전체 인덱싱 중입니다. 배치 색인을 기다려주세요.");
    } else {
      elasticSearchRepository.save(doc);
      log.info("  단건 색인 완료: {} 건 색인", doc.getId());
    }
  }

  @Transactional
  public void deleteSingleIndex(Long postId) {
    Post post = postRepository.findById(postId)
            .orElseThrow(() -> new PostIndexException("ID가 " + postId + "인 게시물이 존재하지 않습니다."));

    if(indexLockService.isFullIndexLocked()){
      throw new PostIndexException("이미 전체 인덱싱 중입니다.");
    }

    elasticSearchRepository.deleteById(post.getId());
    log.info("  단건 삭제 완료: {} 건 색인", post.getId());
  }

  private PostDocument toDocument(Post p) {

    return PostDocument.builder()
            .id(p.getId())
            .title(p.getTitle())
            .content(p.getContent())
            .rentalFee(p.getRentalFee())
            .deposit(p.getDeposit())
            .address(p.getAddress())
            .category(p.getCategory().name())
            .authorId(p.getAuthorId())
            .likeCount(p.getLikeCount())
            .createdAt(p.getCreatedAt().atZone(java.time.ZoneId.systemDefault()).toInstant())
            .version(1L)
            .build();
  }
}