package com.example.demo.Entity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    private Integer id;
    private UUID user_id;
    private LocalDateTime orderedDate;
    private Integer payment_id;
    private Status status;
}
