package com.training.microservice.user_service.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.training.microservice.user_service.model.User;
import com.training.microservice.user_service.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	
	public List<User> getUsers() {
		return userRepository.findAll();
	}
	
	public Optional<User> findUserById(Long userId) {
	    return userRepository.findById(userId);
	}
	
	public User createUser(User user) {
		return userRepository.save(user);
	}	
	
	public void deleteUser(String userId) {
		userRepository.deleteById(Long.valueOf(userId));
	}
	
	public Optional<User> findByUsername(String username) {
		return userRepository.findByUsername(username);
	}
	
	public boolean emailExists(String email) {
		return userRepository.existsByEmail(email);
	}

	public boolean usernameExists(String username) {
		return userRepository.existsByUsername(username);
	}
	
	/*
	public void aktualisieren(Long id, Benutzer neuerBenutzer) {
		
	}*/
	
}
