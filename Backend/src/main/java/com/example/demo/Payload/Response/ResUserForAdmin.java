package com.example.demo.Payload.Response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResUserForAdmin {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String role;
}
