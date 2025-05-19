//package com.nextdoor.nextdoor.domain.chat.infrastructure.persistence;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.data.cassandra.config.AbstractCassandraConfiguration;
//import org.springframework.data.cassandra.config.SchemaAction;
//import org.springframework.data.cassandra.repository.config.EnableCassandraRepositories;
//
//@Configuration
//@EnableCassandraRepositories(basePackages = "com.nextdoor.nextdoor.domain.chat.infrastructure.persistence")
//public class CassandraConfig extends AbstractCassandraConfiguration {
//
//    @Value("${spring.cassandra.keyspace-name}")
//    private String keyspace;
//
//    @Value("${spring.cassandra.contact-points}")
//    private String contactPoints;
//
//    @Value("${spring.cassandra.port}")
//    private int port;
//
//    @Value("${spring.cassandra.local-datacenter}")
//    private String datacenter;
//
//    @Override
//    protected String getKeyspaceName() {
//        return keyspace;
//    }
//
//    @Override
//    protected String getContactPoints() {
//        return contactPoints;
//    }
//
//    @Override
//    protected int getPort() {
//        return port;
//    }
//
//    @Override
//    protected String getLocalDataCenter() {
//        return datacenter;
//    }
//
//    // 이 메서드를 추가해야 CREATE_IF_NOT_EXISTS 동작합니다
//    @Override
//    public SchemaAction getSchemaAction() {
//        // CREATE_IF_NOT_EXISTS, RECREATE_DROP_UNUSED, RECREATE, NONE 등 사용 가능
//        return SchemaAction.CREATE_IF_NOT_EXISTS;
//    }
//
//    @Override
//    public String[] getEntityBasePackages() {
//        return new String[]{"com.nextdoor.nextdoor.domain.chat.domain"};
//    }
//}