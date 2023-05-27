package com.balintcsala.jawkhw.entities;

import jakarta.persistence.*;

import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "users", schema = "userdata")
public class User implements Serializable {
    @Basic
    @Id
    private String username;

    @Basic
    private Byte admin;

    @Basic
    private String name;

    @Basic
    @Column(name = "password_hash")
    private String passwordHash;

    @ManyToMany
    @JoinTable(name = "follows", joinColumns = @JoinColumn(name = "follower"), inverseJoinColumns = @JoinColumn(name = "followed"))
    private Set<User> followedUsers;

    @ManyToMany(mappedBy = "followedUsers")
    private Set<User> followers;

    public User() {
    }

    public User(boolean admin, String username, String name, String passwordHash) {
        this.admin = (byte) (admin ? 1 : 0);
        this.username = username;
        this.name = name;
        this.passwordHash = passwordHash;
    }

    public Byte getAdmin() {
        return admin;
    }

    public void setAdmin(boolean admin) {
        this.admin = (byte) (admin ? 1 : 0);
    }

    public String getUsername() {
        return username;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
        return Objects.equals(username, user.username) && Objects.equals(admin, user.admin) && Objects.equals(name, user.name) && Objects.equals(passwordHash, user.passwordHash);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, name, admin, passwordHash);
    }

    public Set<User> getFollowedUsers() {
        return followedUsers;
    }

    public Set<User> getFollowers() {
        return followers;
    }

    public void followUser(User user) {
        followedUsers.add(user);
    }
}
