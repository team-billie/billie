package com.nextdoor.nextdoor.domain.auth;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

public class CustomOAuth2User implements OAuth2User {

	private String name;
	private Collection<? extends GrantedAuthority> authorities;
	private Map<String, Object> attributes;

	public CustomOAuth2User(String name, Map<String, Object> attributes) {
		this.name = name;
		this.attributes = attributes;
		this.authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
	}

	@Override
	public Map<String, Object> getAttributes() {
		return this.attributes;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.authorities;
	}

	@Override
	public String getName() {
		return this.name;
	}

}
