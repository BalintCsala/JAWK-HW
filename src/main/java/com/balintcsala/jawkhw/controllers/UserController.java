package com.balintcsala.jawkhw.controllers;

import com.balintcsala.jawkhw.Hasher;
import com.balintcsala.jawkhw.entities.Token;
import com.balintcsala.jawkhw.entities.User;
import com.balintcsala.jawkhw.repositories.TokenRepository;
import com.balintcsala.jawkhw.repositories.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.Date;

@RestController
public class UserController {

    final int WEEK_MILLIS = 1000 * 60 * 60 * 24 * 7;

    static class LoginData {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }

    static class RegisterData {
        private String username;
        private String password;
        private String name;

        public String getUsername() {
            return username;
        }

        public String getPassword() {
            return password;
        }

        public String getName() {
            return name;
        }
    }

    static class LoginResult {
        private User user;
        private String token;

        public User getUser() {
            return user;
        }

        public String getToken() {
            return token;
        }

        public LoginResult(User user, String token) {
            this.user = user;
            this.token = token;
        }
    }

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;

    public UserController(UserRepository userRepository, TokenRepository tokenRepository) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
    }

    @GetMapping("/user/{username}")
    public User getUserByName(@PathVariable String username) {
        return userRepository.findByUsername(username);
    }

    @PostMapping("/user/token")
    public boolean checkToken(@RequestBody String tokenStr) {
        Token token = tokenRepository.findByToken(tokenStr);
        if (token == null) {
            return false;
        }
        if (token.getExpirationDate().getTime() < System.currentTimeMillis()) {
            tokenRepository.delete(token);
            return false;
        }

        return true;
    }

    private Token createNewToken(User user) {
        try {
            String tokenStr = Hasher.hash(user.getUsername() + System.currentTimeMillis());

            Token token = new Token(tokenStr, user, new Date(System.currentTimeMillis() + WEEK_MILLIS));
            tokenRepository.save(token);
            return token;
        } catch (NoSuchAlgorithmException e) {
            return null;
        }
    }

    @PostMapping("/user/login")
    public LoginResult login(@RequestBody LoginData data) {
        String passwordHash;
        try {
            passwordHash = Hasher.hash(data.getPassword());
        } catch (NoSuchAlgorithmException e) {
            return null;
        }
        User user = userRepository.findByUsername(data.getUsername());
        if (user == null) {
            return null;
        }
        if (!user.getPasswordHash().equals(passwordHash)) {
            return null;
        }

        Token currToken = tokenRepository.findByUser(user);
        if (currToken != null) {
            return new LoginResult(user, currToken.getToken());
        }

        Token token = createNewToken(user);
        if (token == null) {
            return null;
        }
        return new LoginResult(user, token.getToken());
    }

    @PostMapping("/user/logout")
    public boolean logout(@RequestBody String tokenStr) {
        Token token = tokenRepository.findByToken(tokenStr);
        if (token == null) {
            return false;
        }
        tokenRepository.delete(token);
        return true;
    }

    @PostMapping("/user/register")
    public LoginResult register(@RequestBody RegisterData data) {
        String passwordHash;
        try {
            passwordHash = Hasher.hash(data.getPassword());
        } catch (NoSuchAlgorithmException e) {
            return null;
        }
        User user = userRepository.findByUsername(data.getUsername());
        if (user != null) {
            return null;
        }

        user = new User(false, data.getUsername(), data.getName(), passwordHash);
        userRepository.save(user);

        Token token = createNewToken(user);
        if (token == null) {
            return null;
        }

        return new LoginResult(user, token.getToken());
    }

    static class AvatarChangeData {
        private String token;
        private String avatar;

        public String getToken() {
            return token;
        }

        public String getAvatar() {
            return avatar;
        }
    }

    @PutMapping("/user/avatar")
    public boolean changeAvatar(@RequestBody AvatarChangeData data) {
        Token token = tokenRepository.findByToken(data.getToken());
        if (token == null) {
            return false;
        }
        User user = token.getUser();
        user.setAvatar(data.getAvatar());
        userRepository.save(user);
        return true;
    }

    static class BioChangeData {
        private String token;
        private String bio;

        public String getToken() {
            return token;
        }

        public String getBio() {
            return bio;
        }
    }

    @PutMapping("/user/bio")
    public boolean changeBio(@RequestBody BioChangeData data) {
        Token token = tokenRepository.findByToken(data.getToken());
        if (token == null) {
            return false;
        }
        User user = token.getUser();
        user.setBio(data.getBio());
        userRepository.save(user);
        return true;
    }

    static class FollowData {
        private String token;
        private String username;

        public String getToken() {
            return token;
        }

        public String getUsername() {
            return username;
        }
    }

    @PostMapping("/user/follow")
    public boolean follow(@RequestBody FollowData data) {
        Token token = tokenRepository.findByToken(data.token);
        if (token == null) {
            return false;
        }
        User user = token.getUser();
        User followed = userRepository.findByUsername(data.username);
        user.followUser(followed);
        userRepository.save(user);
        return true;
    }
}
