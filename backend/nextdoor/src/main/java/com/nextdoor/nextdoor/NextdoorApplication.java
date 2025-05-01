package com.nextdoor.nextdoor;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
public class NextdoorApplication {

	public static void main(String[] args) {
		SpringApplication.run(NextdoorApplication.class, args);
	}

}
