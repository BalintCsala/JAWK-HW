package com.balintcsala.jawkhw.repositories;

import com.balintcsala.jawkhw.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface PostRepository extends JpaRepository<Post, Integer> {
}