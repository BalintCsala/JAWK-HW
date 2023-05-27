package com.balintcsala.jawkhw.repositories;

import com.balintcsala.jawkhw.entities.Post;
import com.balintcsala.jawkhw.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PostRepository extends JpaRepository<Post, Integer> {

    @Query("SELECT p FROM Post p WHERE p.restricted = 0 OR :user = p.author OR :user IN (SELECT f.followed FROM Follow f WHERE f.follower = p.author)")
    Page<Post> findVisiblePostsForUser(@Param("user") User user, Pageable pageable);

    @Query("SELECT p FROM Post p WHERE p.restricted = 0")
    Page<Post> findVisiblePosts(Pageable pageable);

}
