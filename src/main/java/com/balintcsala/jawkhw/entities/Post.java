package com.balintcsala.jawkhw.entities;

import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "posts", schema = "userdata")
public class Post implements Serializable {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private int id;

    @ManyToOne
    @JoinColumn(name = "author_name")
    private User author;

    @Basic
    private Object type;
    @Basic
    private String content;

    @Basic
    @Column(name = "private")
    private byte privatePost;

    public Object getType() {
        return type;
    }

    public String getContent() {
        return content;
    }

    public boolean isPrivate() {
        return privatePost == 1;
    }

    public User getAuthor() {
        return author;
    }

    public Post() {}

    public Post(User author, Object type, String content, boolean privatePost) {
        this.author = author;
        this.type = type;
        this.content = content;
        this.privatePost = (byte) (privatePost ? 1 : 0);
    }
}
