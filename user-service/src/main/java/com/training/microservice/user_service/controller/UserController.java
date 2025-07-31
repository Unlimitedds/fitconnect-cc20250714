package com.training.microservice.user_service.controller;
import com.training.microservice.user_service.repository.UserRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.HttpStatus;

import com.training.microservice.user_service.model.User;
import com.training.microservice.user_service.service.UserService;

/**
 * HTTP:
 * 	GET:	Lesen
 * 	POST:	Schreiben
 * 	PUT:	Ändern
 * 	DELETE:	Löschen
 */
@RestController
@RequestMapping("/api/user")  				
public class UserController {	
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private UserService userService;
	
	@GetMapping
	public List<User> all() {				// http://localhost:8083/api/user
		return userService.getUsers();
	}
	
	@GetMapping("/{userId}")
	public Optional<User> findUserById(@PathVariable Long userId) {
	    return userService.findUserById(userId);
	}
	
	@PostMapping
	public ResponseEntity<String> save(@RequestBody User user) {
		
		return checkAndCreateUser(user);
	}
 
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request) {
	    Optional<User> user = userService.findByUsername(request.getUsername());
	    User dbUser = user.get();
	    if(dbUser != null && dbUser.getPassword().equals(request.getPassword())) {
	        User tmp = dbUser;
	        tmp.setPassword(null);
	        return ResponseEntity.ok(tmp);
	    } else {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login fehlgeschlagen");
	    }
	}

	
	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody User user) {
	    return checkAndCreateUser(user);
	}

	
	
	private ResponseEntity<String> checkAndCreateUser(User user) {
	    if(!user.isTermsAccepted()) {
	        return ResponseEntity.badRequest().body("AGB müssen akzeptiert werden.");
	    }

	    // Security
	    if(user.getEmail() == null || !user.getEmail().contains("@")) {
	        return ResponseEntity.badRequest().body("Wrong email format");
	    }

	    if(userService.emailExists(user.getEmail())) {
	        return ResponseEntity.badRequest().body("E-Mail bereits registriert.");
	    }

	    if(userService.usernameExists(user.getUsername())) {
	        return ResponseEntity.badRequest().body("Benutzername ist bereits vergeben.");
	    }

	    userService.createUser(user);
	    return ResponseEntity.ok("Registrierung erfolgreich!");
	}

}