package com.balintcsala.jawkhw.repositories;

import com.balintcsala.jawkhw.entities.Token;
import com.balintcsala.jawkhw.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<Token, String> {

    Token findByToken(String token);

    Token findByUser(User user);

}
