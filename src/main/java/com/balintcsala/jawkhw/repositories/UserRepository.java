package com.balintcsala.jawkhw.repositories;

import com.balintcsala.jawkhw.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {

    User findByUsername(String username);

}
