package com.example.demo.MyController;


import com.example.demo.Db;
import com.example.demo.Entity.Product;
import com.example.demo.Payload.Request.ReqProduct;
import lombok.Data;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @PostMapping
    public void SaveProduct(@RequestBody ReqProduct reqProduct) throws SQLException {
        Db.SaveProduct(reqProduct);
    }

    @GetMapping
    public HttpEntity<?> getProducts(@RequestParam(defaultValue = "") Integer categoryId,@RequestParam(defaultValue = "") String search) throws SQLException {
        List<Product> currentProducts;
        if(categoryId==null){
            currentProducts = Db.GetAllProducts(search);
        }else {
            currentProducts = Db.GetCategoryProducts(search,categoryId);
        }
        return ResponseEntity.ok(currentProducts);
    }

    @DeleteMapping("/{id}")
    public void DelProduct(@PathVariable Integer id) throws SQLException {
        Db.DelProducts(id);
    }

    @PutMapping("/{id}")
    public void EditProduct(@PathVariable Integer id,@RequestBody ReqProduct reqProduct) throws SQLException {
        Db.EditProduct(id,reqProduct);
    }

    @PutMapping("/wishlist/{id}")
    public void changeWishlist(@PathVariable Integer id,@RequestBody ReqProduct reqProduct) throws SQLException {
        Db.changeWishlist(id,reqProduct);
    }
}
