package com.nextdoor.nextdoor.domain.post.search;

import java.time.Instant;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;
import lombok.*;

@Document(indexName = "#{@elasticsearchConfig.getPostsIndexName()}")
@Setting(settingPath = "elasticsearch/post-settings.json")
@Mapping(mappingPath = "elasticsearch/post-mapping.json")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PostDocument {

  @Id
  private Long id;

  @Field(type = FieldType.Text, analyzer = "korean")
  private String title;

  @Field(type = FieldType.Text, analyzer = "korean")
  private String content;

  @Field(type = FieldType.Long)
  private Long rentalFee;

  @Field(type = FieldType.Long)
  private Long deposit;

  @Field(type = FieldType.Keyword)
  private String address;

  @GeoPointField
  private GeoPoint location;

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  public static class GeoPoint {
    private Double lat;
    private Double lon;
  }

  @Field(type = FieldType.Keyword)
  private String category;

  @Field(type = FieldType.Long)
  private Long authorId;

  @Field(type = FieldType.Integer)
  private Integer likeCount;

  @Field(type = FieldType.Date)
  private Instant createdAt;

  @Field(type = FieldType.Long)
  private Long version;
}