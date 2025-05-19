package com.nextdoor.nextdoor.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.support.TransactionSynchronizationManager;

@Configuration
public class ApplicationConfig {

    @Bean
    public TransactionSynchronizationManager transactionSynchronizationManager() throws InstantiationException, IllegalAccessException {
        return TransactionSynchronizationManager.class.newInstance();
    }
}