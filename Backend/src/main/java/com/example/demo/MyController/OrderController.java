package com.example.demo.MyController;

import com.example.demo.Db;
import com.example.demo.Entity.Order;
import com.example.demo.Payload.Request.ReqOrder;
import com.example.demo.Payload.Response.ResDataProducts;
import com.example.demo.Payload.Response.ResOrder;
import com.example.demo.Payload.Response.ResOrderProduct;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    @PostMapping
    public void SaveOrder(@RequestBody ReqOrder reqOrder,@RequestHeader(defaultValue = "") String token) throws SQLException {
        Integer payment_id = Db.SavePayment(reqOrder, token);
        Order Currentorder = Db.SaveOrder(token,payment_id);
        Db.SaveOrderProduct(reqOrder,Currentorder);
    }

    @GetMapping("/orderUser")
    public HttpEntity<?> getOrdersOfUsers(@RequestHeader(defaultValue = "") String token) throws SQLException {
        List<ResOrder> resOrders = Db.getUserOrders(token);
        return ResponseEntity.ok(resOrders);
    }

    @GetMapping("/status/created")
    public HttpEntity<?> getOrderOfCreated() throws SQLException {
        List<ResOrder> resOrderProducts = Db.getOrderAccordingToStatusOfCreated();
        return ResponseEntity.ok(resOrderProducts);
    }

    @GetMapping("/status/accepted")
    public HttpEntity<?> getOrderOfAccepted() throws SQLException {
        List<ResOrder> resOrderProducts = Db.getOrderAccordingToStatusOfAccepted();
        return ResponseEntity.ok(resOrderProducts);
    }

    @GetMapping("/status/inprogress")
    public HttpEntity<?> getOrderOfInprogress() throws SQLException {
        List<ResOrder> resOrderProducts = Db.getOrderAccordingToStatusOfInprogress();
        return ResponseEntity.ok(resOrderProducts);
    }

    @GetMapping("/status/completed")
    public HttpEntity<?> getOrderOfCompleted() throws SQLException {
        List<ResOrder> resOrderProducts = Db.getOrderAccordingToStatusOfCompleted();
        return ResponseEntity.ok(resOrderProducts);
    }

    @GetMapping("/status/delivered")
    public HttpEntity<?> getOrderOfDelivered() throws SQLException {
        List<ResOrder> resOrderProducts = Db.getOrderAccordingToStatusOfDelivered();
        return ResponseEntity.ok(resOrderProducts);
    }

    @GetMapping("/status/archived")
    public HttpEntity<?> getOrderOfArchived() throws SQLException {
        List<ResOrder> resOrderProducts = Db.getOrderAccordingToStatusOfArchived();
        return ResponseEntity.ok(resOrderProducts);
    }

    @GetMapping("/orderProduct")
    public HttpEntity<?> DataOfProducts() throws SQLException {
        List<ResDataProducts> resDataProducts = Db.DataOfProducts();
        return ResponseEntity.ok(resDataProducts);
    }

    @PutMapping
    public  HttpEntity<?> NexToBox(@RequestParam Integer orderId,@RequestParam String status,@RequestHeader(defaultValue = "") String token) throws SQLException {
        String s = Db.NextToBox(orderId, status, token);
        if(!s.equals("")){
            return ResponseEntity.ok(s);

        }else {
            return ResponseEntity.ok("");
        }
    }
}
