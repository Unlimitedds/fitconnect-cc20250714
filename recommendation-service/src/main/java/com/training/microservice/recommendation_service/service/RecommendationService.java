package com.training.microservice.recommendation_service.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.training.microservice.recommendation_service.model.Recommendation;
import com.training.microservice.recommendation_service.repository.RecommendationRepository;

@Service
public class RecommendationService {

    @Autowired
    private RecommendationRepository repository;

    public List<Recommendation> alleRecommendations() {
        return repository.findAll();
    }

    public Optional<Recommendation> findeNachId(Long id) {
        return repository.findById(id);
    }

    public Recommendation speichern(Recommendation recommendation) {
        return repository.save(recommendation);
    }

    public void loeschen(Long id) {
        repository.deleteById(id);
    }
}
