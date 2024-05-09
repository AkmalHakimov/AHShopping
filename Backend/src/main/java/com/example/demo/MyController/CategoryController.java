package com.example.demo.MyController;

import com.example.demo.Db;
import com.example.demo.Entity.Category;
import com.example.demo.Payload.Request.ReqCategory;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @PostMapping
    public HttpEntity<?> SaveCategory(@RequestBody ReqCategory reqCategory) throws SQLException {
        Db.SaveCategory(reqCategory);
        return ResponseEntity.ok("Saved✅");
    }

    @GetMapping
    public HttpEntity<?> getCategories(@RequestParam(defaultValue = "") String search) throws SQLException {
        List<Category> categories = Db.getCategories(search);
        return ResponseEntity.ok(categories);
    }

    @DeleteMapping("/{id}")
    public void DelCategory(@PathVariable Integer id) throws SQLException {
       Db.DelCategory(id);
    }

    @PutMapping("/{id}")
    public void UpdateCategory(@PathVariable Integer id, @RequestBody ReqCategory reqCategory) throws SQLException {
        Db.UpdateCategory(id,reqCategory);
    }
}
