package com.example.demo.Payload.Request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReqProduct {
    private String name;
    private Integer categoryId;
    private Integer price;
    private String photoId;
    private String description;
    private Boolean wishlist;
}
