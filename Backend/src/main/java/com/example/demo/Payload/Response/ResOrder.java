package com.example.demo.Payload.Response;

import com.example.demo.Entity.PayType;
import com.example.demo.Entity.Status;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResOrder {
    private Integer id;
    private String firstNameUser;
    private String lastNameUser;
    private LocalDateTime orderedDate;
    private Integer TotalPrice;
    private PayType payType;
    private Status status;
    private List<ResOrderProduct> orderProducts;

    public ResOrder(LocalDateTime orderedDate, Integer totalPrice, PayType payType, Status status, List<ResOrderProduct> orderProducts) {
        this.orderedDate = orderedDate;
        TotalPrice = totalPrice;
        this.payType = payType;
        this.status = status;
        this.orderProducts = orderProducts;
    }
}
