package com.balintcsala.jawkhw.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "follows", schema = "userdata", catalog = "")
public class Follow {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private int id;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "follower")
    private User follower;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "followed")
    private User followed;

    public User getFollower() {
        return follower;
    }

    public User getFollowed() {
        return followed;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Follow follow = (Follow) o;
        return id == follow.id && Objects.equals(follower, follow.follower) && Objects.equals(followed, follow.followed);
    }

    @Override
    public int hashCode() {
        return Objects.hash(follower, followed, id);
    }
}
