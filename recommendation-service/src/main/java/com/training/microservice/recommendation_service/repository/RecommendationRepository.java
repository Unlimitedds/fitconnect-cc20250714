package com.training.microservice.recommendation_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.training.microservice.recommendation_service.model.Recommendation;


public interface RecommendationRepository extends JpaRepository<Recommendation, Long>{

}
