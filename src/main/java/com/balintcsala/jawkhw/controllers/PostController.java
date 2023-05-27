package com.balintcsala.jawkhw.controllers;

import com.balintcsala.jawkhw.entities.Post;
import com.balintcsala.jawkhw.entities.Token;
import com.balintcsala.jawkhw.repositories.PostRepository;
import com.balintcsala.jawkhw.repositories.TokenRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

@RestController
public class PostController {

    static class NewPostData {
        private String title;
        private String type;
        private String content;
        private boolean restricted;
        private String token;

        public String getTitle() {
            return title;
        }

        public String getContent() {
            return content;
        }

        public String getType() {
            return type;
        }

        public String getToken() {
            return token;
        }

        public boolean isRestricted() {
            return restricted;
        }
    }

    private final PostRepository postRepository;
    private final TokenRepository tokenRepository;

    public PostController(PostRepository postRepository, TokenRepository tokenRepository) {
        this.postRepository = postRepository;
        this.tokenRepository = tokenRepository;
    }

    @GetMapping("/posts/{page}")
    Iterable<Post> getPosts(@PathVariable int page, @RequestParam(required = false) String token) {
        Token tokenObj = tokenRepository.findByToken(token);
        Pageable pagination = PageRequest.of(page, 10, Sort.by("id").descending());
        if (tokenObj != null) {
            return postRepository.findVisiblePostsForUser(tokenObj.getUser(), pagination);
        } else {
            return postRepository.findVisiblePosts(pagination);
        }
    }

    @PostMapping("/post/new")
    Post newPost(@RequestBody NewPostData newPost) {
        Token token = tokenRepository.findByToken(newPost.getToken());
        if (token == null) return null;
        return postRepository.save(new Post(
                token.getUser(),
                newPost.getType(),
                newPost.getContent(),
                newPost.isRestricted()
        ));
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
