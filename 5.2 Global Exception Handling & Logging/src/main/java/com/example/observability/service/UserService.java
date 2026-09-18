package com.example.observability.service;

import java.util.Comparator;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example.observability.api.User;
import com.example.observability.api.UserRequest;
import com.example.observability.exception.UserAlreadyExistsException;
import com.example.observability.exception.UserNotFoundException;

@Service
public class UserService {

    private static final Logger log = LoggerFactory.getLogger(UserService.class);
    private final ConcurrentMap<String, User> users = new ConcurrentHashMap<>();

    public UserService() {
        users.put("24BAI70236", new User("24BAI70236", "Sam Fawaz Hadi AL-Basara"));
    }

    public List<User> findAll() {
        return users.values().stream()
                .sorted(Comparator.comparing(User::uid))
                .toList();
    }

    public User findByUid(String uid) {
        User user = users.get(uid);
        if (user == null) {
            throw new UserNotFoundException("User not found with UID: " + uid);
        }
        return user;
    }

    public User create(UserRequest request) {
        User user = new User(request.uid().trim(), request.name().trim());
        if (users.putIfAbsent(user.uid(), user) != null) {
            throw new UserAlreadyExistsException("A user already exists with UID: " + user.uid());
        }
        log.info("event=user_created uid={}", user.uid());
        return user;
    }

    public User update(String uid, UserRequest request) {
        findByUid(uid);
        User updated = new User(uid, request.name().trim());
        users.put(uid, updated);
        log.info("event=user_updated uid={}", uid);
        return updated;
    }

    public void delete(String uid) {
        findByUid(uid);
        users.remove(uid);
        log.info("event=user_deleted uid={}", uid);
    }
}
