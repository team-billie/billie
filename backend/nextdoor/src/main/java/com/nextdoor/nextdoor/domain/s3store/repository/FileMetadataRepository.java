package com.nextdoor.nextdoor.domain.s3store.repository;


import com.nextdoor.nextdoor.domain.s3store.domain.FileMetadata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FileMetadataRepository extends JpaRepository<FileMetadata, Long> {

    Optional<FileMetadata> findByServiceIdAndResourceIdAndResourceType(




            String serviceId, String resourceId, String resourceType);

    List<FileMetadata> findAllByServiceIdAndResourceId(String serviceId, String resourceId);

    void deleteByServiceIdAndResourceIdAndResourceType(
            String serviceId, String resourceId, String resourceType);
}