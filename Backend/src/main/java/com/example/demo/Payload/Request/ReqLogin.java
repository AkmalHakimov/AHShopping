package com.example.demo.Payload.Request;

import com.example.demo.Entity.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReqLogin {
    private String email;
    private String password;
}
