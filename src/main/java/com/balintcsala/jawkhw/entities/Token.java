package com.balintcsala.jawkhw.entities;

import jakarta.persistence.*;

import java.util.Date;
import java.util.Objects;

@Entity
@Table(name = "tokens", schema = "userdata")
public class Token {
    @Id
    @Column(name = "token")
    private String token;

    @OneToOne
    @JoinColumn(name = "user")
    private User user;

    @Column(name = "expiration_date")
    private Date expirationDate;

    public String getToken() {
        return token;
    }

    public User getUser() {
        return user;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Token token1 = (Token) o;
        return Objects.equals(token, token1.token) && Objects.equals(user, token1.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(token, user);
    }

    public Token() {}

    public Token(String token, User user, Date expirationDate) {
        this.token = token;
        this.user = user;
        this.expirationDate = expirationDate;
    }
}
