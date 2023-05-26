package com.balintcsala.jawkhw.controllers;

import com.balintcsala.jawkhw.entities.Post;
import com.balintcsala.jawkhw.repositories.PostRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
public class PostController {

    private final PostRepository postRepository;

    public PostController(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @GetMapping("/posts/{page}")
    Iterable<Post> getPosts(@PathVariable int page) {
        return postRepository.findAll(PageRequest.of(page, 10));
    }

    @PostMapping("/newpost")
    Post newPost(@RequestBody Post newPost) {
        return postRepository.save(newPost);
    }

    @GetMapping("/post/{id}")
    Post getPost(@PathVariable int id) {
        return postRepository.findById(id).orElseThrow();
    }

    @DeleteMapping("/post/{id}")
    void deletePost(@PathVariable int id) {
        postRepository.deleteById(id);
    }

}
