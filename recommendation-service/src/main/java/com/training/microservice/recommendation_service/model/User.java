package com.training.microservice.recommendation_service.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Entity			
@Data
public class User {		 // Tabelle in Datenbank 

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;	// Primärschlüssel
	
	private String name;
	
	private String email;
	
	private String password;

	@Override
	public String toString() {
		return "Benutzer [id=" + id + ", name=" + name + ", email=" + email + ", password=" + password + "]";
	}	
}
