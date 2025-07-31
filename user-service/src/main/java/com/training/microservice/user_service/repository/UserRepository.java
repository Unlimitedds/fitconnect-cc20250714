package com.training.microservice.user_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.training.microservice.user_service.model.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>{

	boolean existsByEmail(String email);
	
	boolean existsByUsername(String username);
	
	Optional<User> findByUsername(String username);
}
