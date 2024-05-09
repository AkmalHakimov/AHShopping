package com.example.demo.MyController;

import com.example.demo.Db;
import com.example.demo.Entity.User;
import com.example.demo.Payload.Request.ReqLogin;
import com.example.demo.Payload.Request.ReqUser;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/signUp")
    public HttpEntity<?> SignUp(@RequestBody ReqUser reqUser) throws SQLException {
        Db.SaveUser(reqUser);
        return ResponseEntity.ok("successful✅");
    }

    @PostMapping("/login")
    public HttpEntity<?> Login(@RequestBody ReqLogin reqLogin) throws SQLException {
        List<User> users = Db.LoginUser();
        for (User user : users) {
            if(user.getEmail().equals(reqLogin.getEmail()) && user.getPassword().equals(reqLogin.getPassword())){
                return ResponseEntity.ok(user.getId());
            }
        }
        return ResponseEntity.status(404).body("Email or Password is incorrect!");
    }
}
