package com.example.demo.MyController;

import com.example.demo.Db;
import com.example.demo.Entity.User;
import com.example.demo.Payload.Request.ReqUser;
import com.example.demo.Payload.Response.ResDataUsers;
import com.example.demo.Payload.Response.ResUserForAdmin;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @GetMapping
    public HttpEntity<?> getUsers() throws SQLException {
        List<User> users = Db.getUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/data")
    public HttpEntity<?> getDataOfUsers(@RequestHeader(defaultValue = "") String token) throws SQLException {
        if(token.equals("")){
            return ResponseEntity.ok("xatolik yuz berdi!");
        }else {
            List<ResDataUsers> resDataUsers = Db.getDataOfUsers(token);
            return ResponseEntity.ok(resDataUsers);
        }
    }

    @GetMapping("/adminUser")
    public HttpEntity<?> getUsersForAdmin() throws SQLException {
            List<ResUserForAdmin> resUserForAdmins = Db.getUsersForAdmin();
            return ResponseEntity.ok(resUserForAdmins);
    }

    @GetMapping("/role")
    public HttpEntity<?> getUserRoles() throws SQLException {
        List<String> roles = Db.getRoles();
        return ResponseEntity.ok(roles);
    }

    @GetMapping("/me")
    public HttpEntity<?> getMe(@RequestHeader(defaultValue = "") String token) throws SQLException {
        if(token.equals("")){
            return ResponseEntity.ok(new User(null,null));
        }else {
            User me = Db.getMe(token);
            return ResponseEntity.ok(me);
        }
    }

    @PutMapping
    public HttpEntity<?> EditUserForAdmin(@RequestBody ReqUser reqUser,@RequestParam String userId) throws SQLException {
       Db.EditUser(reqUser,userId);
       return ResponseEntity.ok("");
    }
}
