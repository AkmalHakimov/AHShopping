package com.example.demo.Entity;


import com.example.demo.Payload.Request.ReqLogin;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private UUID id;
    private String firstName;
    private String lastName;
    private Integer age;
    private String email;
    private String password;
    private String repeatPassword;
    private Integer photoId;
    private Role role;

    public User(UUID id, String firstName, String lastName, Integer age, String email, String password, String repeatPassword, Role role) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.password = password;
        this.repeatPassword = repeatPassword;
        this.role = role;
    }

    public User(UUID id, String email, String password) {
        this.id = id;
        this.email = email;
        this.password = password;
    }

    public User(UUID id, String firstName, String lastName, Integer age, String email, String password, String repeatPassword) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.email = email;
        this.password = password;
        this.repeatPassword = repeatPassword;
    }

    public User(String email, Role role) {
        this.email = email;
        this.role = role;
    }

    public boolean  checkUser(ReqLogin loginReq){
        return loginReq.getEmail().equals(email) && loginReq.getPassword().equals(password);
    }
}
