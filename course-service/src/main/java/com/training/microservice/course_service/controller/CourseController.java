package com.training.microservice.course_service.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.training.microservice.course_service.model.Course;
import com.training.microservice.course_service.service.CourseService;

@CrossOrigin(origins = "http://localhost:3000") // <- wichtig für React-Zugriff
@RestController
@RequestMapping("/api/course")
public class CourseController {

    @Autowired
    private CourseService kursService;

    // Alle Kurse abrufen
    @GetMapping
    public List<Course> alle() {
        return kursService.alleKurse();
    }

    // Einzelnen Kurs nach ID abrufen
    @GetMapping("/{courseId}")
    public Optional<Course> findeNachId(@PathVariable Long courseId) {
        return kursService.findeNachId(courseId);
    }

    // Neuen Kurs anlegen
    @PostMapping
    public Course erzeugen(@RequestBody Course kurs) {
        return kursService.speichern(kurs);
    }

    // Kurs aktualisieren
    @PutMapping("/{courseId}")
    public ResponseEntity<Course> aktualisieren(@PathVariable Long courseId, @RequestBody Course kursDetails) {
        Optional<Course> optionalKurs = kursService.findeNachId(courseId);
        if (optionalKurs.isPresent()) {
            Course kurs = optionalKurs.get();
            kurs.setTitle(kursDetails.getTitle());
            kurs.setDescription(kursDetails.getDescription());
            kurs.setTrainer(kursDetails.getTrainer());
            Course aktualisiert = kursService.speichern(kurs);
            return ResponseEntity.ok(aktualisiert);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Kurs löschen
    @DeleteMapping("/{courseId}")
    public ResponseEntity<?> loeschen(@PathVariable Long courseId) {
        kursService.loeschen(courseId);
        return ResponseEntity.ok().build();
    }
}
