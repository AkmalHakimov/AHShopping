package com.example.demo.Payload.Request;

import com.example.demo.Entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReqUser {
    private String firstName;
    private String lastName;
    private Integer age;
    private String email;
    private String password;
    private String repeatPassword;
    private String role;
    private Integer photoId;
}
