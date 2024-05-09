package com.example.demo.MyController;

import com.example.demo.Db;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {
    @GetMapping
    public HttpEntity<?> getTotalSum(@RequestParam(defaultValue = "") String payType) throws SQLException {
        Integer totalSum = Db.getTotalSumForPerPayType(payType);
        return ResponseEntity.ok(totalSum);
    }
}
