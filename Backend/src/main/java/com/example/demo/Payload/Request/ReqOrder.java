package com.example.demo.Payload.Request;

import com.example.demo.Entity.PayType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReqOrder {
    private List<ReqOrderProduct> reqOrderProducts;
    private Integer amount;
    private String payType;
}
