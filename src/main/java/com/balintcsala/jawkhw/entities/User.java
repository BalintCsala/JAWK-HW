package com.balintcsala.jawkhw.entities;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "users", schema = "userdata")
public class User implements Serializable {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int id;
    @Basic
    private Byte admin;
    @Basic
    private String username;
    @Basic
    private String name;
    @Basic
    @Column(name = "password_hash")
    private String passwordHash;

    @ManyToMany
    @JoinTable(name = "follows", joinColumns = @JoinColumn(name = "follower_id"), inverseJoinColumns = @JoinColumn(name = "followed_id"))
    Set<User> followedUsers;

    @ManyToMany(mappedBy = "followedUsers")
    Set<User> followers;

    public User() {
    }

    public User(boolean admin, String username, String name, String passwordHash) {
        this.admin = (byte) (admin ? 1 : 0);
        this.username = username;
        this.name = name;
        this.passwordHash = passwordHash;
    }

    public int getId() {
        return id;
    }

    public Byte getAdmin() {
        return admin;
    }

    public void setAdmin(Byte admin) {
        this.admin = admin;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getName() {
        return name;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id == user.id && Objects.equals(admin, user.admin) && Objects.equals(username, user.username) && Objects.equals(name, user.name) && Objects.equals(passwordHash, user.passwordHash);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, admin, username, name, passwordHash);
    }
}
