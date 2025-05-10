package com.nextdoor.nextdoor.domain.chat.infrastructure.persistence;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.cassandra.config.AbstractCassandraConfiguration;
import org.springframework.data.cassandra.repository.config.EnableCassandraRepositories;

@Configuration
@EnableCassandraRepositories(basePackages = "com.nextdoor.nextdoor.domain.chat.infrastructure.persistence")
public class CassandraConfig extends AbstractCassandraConfiguration {
    @Override
    protected String getKeyspaceName() {
        return "nextdoor_chat";
    }

    @Override
    public String[] getEntityBasePackages() {
        return new String[]{"com.nextdoor.nextdoor.chat.domain"};
    }
}