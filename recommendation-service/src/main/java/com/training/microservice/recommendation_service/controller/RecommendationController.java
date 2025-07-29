package com.training.microservice.recommendation_service.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.training.microservice.recommendation_service.model.Recommendation;
import com.training.microservice.recommendation_service.service.RecommendationService;

@RestController
@RequestMapping("/api/recommendation")
public class RecommendationController {

    @Autowired
    private RecommendationService recommendationService;

    @GetMapping
    public List<Recommendation> alle() {
        return recommendationService.alleRecommendations();
    }

    @GetMapping("/{id}")
    public Optional<Recommendation> findeNachId(@PathVariable Long id) {
        return recommendationService.findeNachId(id);
    }

    @PostMapping
    public Recommendation erzeugen(@RequestBody Recommendation recommendation) {
        return recommendationService.speichern(recommendation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> loeschen(@PathVariable Long id) {
        recommendationService.loeschen(id);
        return ResponseEntity.ok().build();
    }
}
