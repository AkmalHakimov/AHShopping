package com.example.demo;

import com.example.demo.Entity.*;
import com.example.demo.Payload.Request.*;
import com.example.demo.Payload.Response.*;
import org.springframework.web.multipart.MultipartFile;

import java.sql.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Db {

    private static Connection connection;

    static {
        try {
            connection = DriverManager.getConnection(
                    "jdbc:postgresql://localhost:5432/shopping_db1",
                    "postgres",
                    "root123"
            );
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static void SaveCategory(ReqCategory reqCategory) throws SQLException {
        PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO categories(name) values (?)");
        preparedStatement.setString(1, reqCategory.getName());
        preparedStatement.executeUpdate();
    }

    public static List<Category> getCategories(String search) throws SQLException {
        List<Category> categories = new ArrayList<>();
        PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM categories WHERE lower(name) LIKE lower(?) ORDER BY id");
        preparedStatement.setString(1, "%" + search + "%");
        ResultSet resultSet = preparedStatement.executeQuery();
        while (resultSet.next()) {
            categories.add(new Category(
                    resultSet.getInt("id"),
                    resultSet.getString("name")
            ));
        }
        return categories;
    }

    public static void DelCategory(Integer id) throws SQLException {
        PreparedStatement preparedStatement = connection.prepareStatement("DELETE FROM categories WHERE id=?");
        preparedStatement.setInt(1, id);
        preparedStatement.executeUpdate();
    }

    public static void UpdateCategory(Integer id, ReqCategory reqCategory) throws SQLException {
        PreparedStatement preparedStatement = connection.prepareStatement("UPDATE categories SET name=? WHERE id=?");
        preparedStatement.setString(1, reqCategory.getName());
        preparedStatement.setInt(2, id);
        preparedStatement.executeUpdate();
    }

    public static void SaveProduct(ReqProduct reqProduct) throws SQLException {
        PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO products(name,category_id,price,photo_id,description) values (?,?,?,CAST(? as uuid),?)");
        preparedStatement.setString(1, reqProduct.getName());
        preparedStatement.setInt(2, reqProduct.getCategoryId());
        preparedStatement.setInt(3, reqProduct.getPrice());
        preparedStatement.setString(4, reqProduct.getPhotoId());
        preparedStatement.setString(5, reqProduct.getDescription());
        preparedStatement.executeUpdate();
    }

    public static List<Product> GetAllProducts(String search) throws SQLException {
        PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM products WHERE lower(name) LIKE lower(?) ORDER BY id");
        preparedStatement.setString(1, "%" + search + "%");
        ResultSet resultSet = preparedStatement.executeQuery();
        List<Product> products = new ArrayList<>();
        while (resultSet.next()) {
            products.add(new Product(
                    resultSet.getInt("id"),
                    resultSet.getString("name"),
                    resultSet.getInt("category_id"),
                    resultSet.getInt("price"),
                    UUID.fromString(resultSet.getString("photo_id")),
                    resultSet.getString("description"),
                    resultSet.getBoolean("wishlist")
            ));
        }
        return products;
    }

    public static List<Product> GetCategoryProducts(String search, Integer categoryId) throws SQLException {
        PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM products WHERE lower(name) LIKE lower(?) AND id=? ORDER BY id");
        preparedStatement.setString(1, "%" + search + "%");
        preparedStatement.setInt(2, categoryId);
        ResultSet resultSet = preparedStatement.executeQuery();
        List<Product> products = new ArrayList<>();
        while (resultSet.next()) {
            products.add(new Product(
                    resultSet.getInt("id"),
                    resultSet.getString("name"),
                    resultSet.getInt("category_id"),
                    resultSet.getInt("price"),
                    UUID.fromString(resultSet.getString("photo_id")),
                    resultSet.getString("description"),
                    resultSet.getBoolean("wishlist")
            ));
        }
        return products;
    }

    public static void DelProducts(Integer id) throws SQLException {
        PreparedStatement preparedStatement = connection.prepareStatement("DELETE FROM products WHERE id=?");
        preparedStatement.setInt(1, id);
        preparedStatement.executeUpdate();
    }

    public static void EditProduct(Integer id, ReqProduct reqProduct) throws SQLException {
        PreparedStatement preparedStatement = connection.prepareStatement("UPDATE products SET name=?,category_id=?,price=?,photo_id=CAST(? as uuid),description=? WHERE id=?");
        preparedStatement.setString(1, reqProduct.getName());
        preparedStatement.setInt(2, reqProduct.getCategoryId());
        preparedStatement.setInt(3, reqProduct.getPrice());
        preparedStatement.setString(4, reqProduct.getPhotoId());
        preparedStatement.setString(5, reqProduct.getDescription());
        preparedStatement.setInt(6, id);
        preparedStatement.executeUpdate();
    }

    public static Order SaveOrder(String userId, Integer payment_id) throws SQLException {
        Timestamp timestamp = Timestamp.valueOf(LocalDateTime.now());
        PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO orders(user_id,ordered_date,payment_id,status) values (cast(? as UUID),?,?,?)");
        preparedStatement.setString(1, userId);
        preparedStatement.setTimestamp(2, timestamp);
        preparedStatement.setInt(3, payment_id);
        preparedStatement.setString(4, Status.CREATED.toString());
        preparedStatement.executeUpdate();
        return currentOrder(timestamp);
    }

    private static Order currentOrder(Timestamp orderedDate) throws SQLException {
        PreparedStatement preparedStatement = connection.prepareStatement("SELECT id FROM orders WHERE ordered_date=?");
        preparedStatement.setTimestamp(1, orderedDate);
        ResultSet resultSet = preparedStatement.executeQuery();
        Order order = new Order();
        while (resultSet.next()) {
            order.setId(resultSet.getInt("id"));
        }
        return order;
    }

    public static void SaveOrderProduct(ReqOrder reqOrder, Order currentOrder) throws SQLException {
        System.out.println(reqOrder.getReqOrderProducts().get(0).getProductId());
        for (ReqOrderProduct reqOrderProduct : reqOrder.getReqOrderProducts()) {
            PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO order_products(order_id,product_id,amount) values (?,?,?)");
            preparedStatement.setInt(1, currentOrder.getId());
            preparedStatement.setInt(2, reqOrderProduct.getProductId());
            preparedStatement.setInt(3, reqOrderProduct.getAmount());
            preparedStatement.executeUpdate();
        }
    }

    public static List<ResOrder> getUserOrders(String userId) throws SQLException {
        List<ResOrder> resOrders = new ArrayList<>();
        if (!userId.equals("")) {
            PreparedStatement preparedStatement = connection.prepareStatement("select id, (select first_name from users where id=user_id) as first_name,(select last_name from users where id=user_id) as last_name, ordered_date,(select total_amount from payments where id = payment_id) as total_price,(select pay_type from payments where id = payment_id) as pay_type,status from orders where user_id = CAST(? as uuid) order by id");
            preparedStatement.setString(1, userId);
            ResultSet resultSet = preparedStatement.executeQuery();
            PreparedStatement preparedStatement1 = connection.prepareStatement("select (select name from products where id = product_id) as product_name,(select price from products where id = product_id) as product_price,amount from order_products where order_id = ?");
            while (resultSet.next()) {
                preparedStatement1.setInt(1, resultSet.getInt("id"));
                ResultSet resultSet1 = preparedStatement1.executeQuery();
                List<ResOrderProduct> orderProducts = new ArrayList<>();
                while (resultSet1.next()) {
                    orderProducts.add(new ResOrderProduct(
                                    resultSet1.getString("product_name"),
                                    resultSet1.getInt("amount"),
                                    resultSet1.getInt("product_price")
                            )
                    );
                }
                resOrders.add(new ResOrder(
                        resultSet.getTimestamp("ordered_date").toLocalDateTime(),
                        resultSet.getInt("total_price"),
                        PayType.valueOf(resultSet.getString("pay_type")),
                        Status.valueOf(resultSet.getString("status")),
                        orderProducts
                ));
            }
            return resOrders;
        } else {
            return resOrders;
        }
    }

    public static List<ResOrder> getOrderAccortingToStatus(String status) throws SQLException {
        List<ResOrder> resOrders = new ArrayList<>();
        PreparedStatement preparedStatement = connection.prepareStatement("select id, (select first_name from users where id=user_id) as first_name,(select last_name from users where id=user_id) as last_name, ordered_date,(select total_amount from payments where id = payment_id) as total_price," +
                "(select pay_type from payments where id = payment_id) as pay_type," +
                "status from orders where status = ? order by id");
        preparedStatement.setString(1, status);
        ResultSet resultSet = preparedStatement.executeQuery();
        PreparedStatement preparedStatement1 = connection.prepareStatement("select (select name from products where id = product_id) as product_name,(select price from products where id = product_id) as product_price," +
                "amount from order_products where order_id = ?");
        while (resultSet.next()) {
            preparedStatement1.setInt(1, resultSet.getInt("id"));
            ResultSet resultSet1 = preparedStatement1.executeQuery();
            List<ResOrderProduct> orderProducts = new ArrayList<>();
            while (resultSet1.next()) {
                orderProducts.add(new ResOrderProduct(
                                resultSet1.getString("product_name"),
                                resultSet1.getInt("amount"),
                                resultSet1.getInt("product_price")
                        )
                );
            }
            resOrders.add(new ResOrder(
                    resultSet.getInt("id"),
                    resultSet.getString("first_name"),
                    resultSet.getString("last_name"),
                    resultSet.getTimestamp("ordered_date").toLocalDateTime(),
                    resultSet.getInt("total_price"),
                    PayType.valueOf(resultSet.getString("pay_type")),
                    Status.valueOf(resultSet.getString("status")),
                    orderProducts
            ));
        }
        return resOrders;
    }

    public static List<ResOrder> getOrderAccordingToStatusOfCreated() throws SQLException {
        return getOrderAccortingToStatus("CREATED");
    }

    public static List<ResOrder> getOrderAccordingToStatusOfAccepted() throws SQLException {
        return getOrderAccortingToStatus("ACCEPTED");
    }

    public static List<ResOrder> getOrderAccordingToStatusOfInprogress() throws SQLException {
        return getOrderAccortingToStatus("INPROGRESS");
    }

    public static List<ResOrder> getOrderAccordingToStatusOfCompleted() throws SQLException {
        return getOrderAccortingToStatus("COMPLETED");
    }

    public static List<ResOrder> getOrderAccordingToStatusOfDelivered() throws SQLException {
        return getOrderAccortingToStatus("DELIVERED");
    }

    public static List<ResOrder> getOrderAccordingToStatusOfArchived() throws SQLException {
        return getOrderAccortingToStatus("ARCHIVED");
    }

    public static UUID SaveAtt(MultipartFile file, String prefix) throws SQLException {
        UUID uuid = UUID.randomUUID();
        PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO attachments(id,prefix,name) VALUES (CAST(? as uuid),?,?)");
        preparedStatement.setString(1, uuid.toString());
        preparedStatement.setString(2, prefix);
        preparedStatement.setString(3, uuid + ":" + file.getOriginalFilename());
        preparedStatement.executeUpdate();
//        PreparedStatement preparedStatement1 = connection.prepareStatement("SELECT * FROM attachments");
//        ResultSet resultSet = preparedStatement1.executeQuery();
//        Attachment attachment = new Attachment();
//        while (resultSet.next()) {
//            attachment.setName(resultSet.getString("name"));
//            attachment.setPrefix(resultSet.getString("prefix"));
//            attachment.setId(resultSet.getInt("id"));
//            attachments.add(attachment);
//        }
        return uuid;
    }

    public static Attachment GetFile(String id) throws SQLException {
        Attachment attachment = new Attachment();
        PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM attachments WHERE id=CAST(? as uuid) order by id");
        preparedStatement.setString(1, id);
        ResultSet resultSet = preparedStatement.executeQuery();
        while (resultSet.next()) {
            attachment.setId(UUID.fromString(resultSet.getString("id")));
            attachment.setPrefix(resultSet.getString("prefix"));
            attachment.setName(resultSet.getString("name"));
        }
        return attachment;
    }

    public static void SaveUser(ReqUser reqUser) throws SQLException {
        PreparedStatement preparedStatement = connection.prepareStatement("INSERT INTO users values (cast(? as UUID),?,?,?,?,?,?,?)");
        preparedStatement.setString(1, UUID.randomUUID().toString());
        preparedStatement.setString(2, reqUser.getFirstName());
        preparedStatement.setString(3, reqUser.getLastName());
        preparedStatement.setInt(4, reqUser.getAge());
        preparedStatement.setString(5, reqUser.getEmail());
        preparedStatement.setString(6, reqUser.getPassword());
        preparedStatement.setString(7, reqUser.getRepeatPassword());
        preparedStatement.setString(8, Role.ROLE_USER.toString());
        preparedStatement.executeUpdate();
    }

    public static List<User> LoginUser() throws SQLException {
        List<User> users = new ArrayList<>();
        PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM users ORDER BY id");
        ResultSet resultSet = preparedStatement.executeQuery();
        while (resultSet.next()) {
            users.add(new User(
                    UUID.fromString(resultSet.getString("id")),
                    resultSet.getString("email"),
                    resultSet.getString("password")
            ));
        }
        return users;
    }

    public static List<User> getUsers() throws SQLException {
        List<User> users = new ArrayList<>();
        PreparedStatement preparedStatement = connection.prepareStatement("SELECT * FROM users ORDER BY id");
        ResultSet resultSet = preparedStatement.executeQuery();
        while (resultSet.next()) {
            users.add(new User(
                    UUID.fromString(resultSet.getString("id")),
                    resultSet.getString("first_name"),
                    resultSet.getString("last_name"),
                    resultSet.getInt("age"),
                    resultSet.getString("email"),
                    resultSet.getString("password"),
                    resultSet.getString("repeat_password"),
                    Role.valueOf(resultSet.getString("role"))
            ));
        }
        return users;
    }

    public static User getMe(String userId) throws SQLException {
        PreparedStatement preparedStatement = connection.prepareStatement("select role, email from users where id = cast(? as uuid)");
        preparedStatement.setString(1, userId);
        ResultSet resultSet = preparedStatement.executeQuery();
        resultSet.next();
        String role = resultSet.getString("role");
        String email = resultSet.getString("email");
        return new User(email, Role.valueOf(role));
    }

    public static Integer SavePayment(ReqOrder reqOrder, String token) throws SQLException {
        LocalDateTime date_time = LocalDateTime.now();
        PreparedStatement preparedStatement = connection.prepareStatement("insert into payments(total_amount,pay_type,date_time,user_id) values (?,?,?,CAST(? as uuid))");
        preparedStatement.setInt(1, reqOrder.getAmount());
        preparedStatement.setString(2, reqOrder.getPayType());
        preparedStatement.setString(3, date_time.toString());
        preparedStatement.setString(4, token.toString());
        preparedStatement.executeUpdate();
        PreparedStatement preparedStatement1 = connection.prepareStatement("select id from payments where date_time = ?");
        preparedStatement1.setString(1, date_time.toString());
        ResultSet resultSet = preparedStatement1.executeQuery();
        resultSet.next();
        return resultSet.getInt("id");
    }


    public static String NextToBox(Integer orderId, String status, String token) throws SQLException {
        PreparedStatement preparedStatement1 = connection.prepareStatement("select role from users where id = CAST(? as uuid)");
        preparedStatement1.setString(1, token);

        ResultSet resultSet = preparedStatement1.executeQuery();
        resultSet.next();
        String role = resultSet.getString("role");
        if (status.equals("ACCEPTED")) {
            if (role.equals("ROLE_ADMIN")) {
                PreparedStatement preparedStatement = connection.prepareStatement("update orders set status=? where id = ?");
                preparedStatement.setString(1, status);
                preparedStatement.setInt(2, orderId);
                preparedStatement.executeUpdate();
            } else {
                return "Sizga bunga ruxsat yoq!";
            }
        } else if (status.equals("INPROGRESS")) {
            if (role.equals("ROLE_COOKER")) {
                PreparedStatement preparedStatement = connection.prepareStatement("update orders set status=? where id = ?");
                preparedStatement.setString(1, status);
                preparedStatement.setInt(2, orderId);
                preparedStatement.executeUpdate();
            } else {
                return "Sizga bunga ruxsat yoq!";
            }
        } else if (status.equals("COMPLETED")) {
            if (role.equals("ROLE_CASHIER")) {
                PreparedStatement preparedStatement = connection.prepareStatement("update orders set status=? where id = ?");
                preparedStatement.setString(1, status);
                preparedStatement.setInt(2, orderId);
                preparedStatement.executeUpdate();
            } else {
                return "Sizga bunga ruxsat yoq!";
            }
        } else if (status.equals("DELIVERED")) {
            if (role.equals("ROLE_COURIER")) {
                PreparedStatement preparedStatement = connection.prepareStatement("update orders set status=? where id = ?");
                preparedStatement.setString(1, status);
                preparedStatement.setInt(2, orderId);
                preparedStatement.executeUpdate();
            } else {
                return "Sizga bunga ruxsat yoq!";
            }
        } else if (status.equals("ARCHIVED")) {
            if (role.equals("ROLE_ADMIN")) {
                PreparedStatement preparedStatement = connection.prepareStatement("update orders set status=? where id = ?");
                preparedStatement.setString(1, status);
                preparedStatement.setInt(2, orderId);
                preparedStatement.executeUpdate();
            } else {
                return "Sizga bunga ruxsat yoq!";
            }
        }
        PreparedStatement preparedStatement = connection.prepareStatement("update orders set status=? where id = ?");
        preparedStatement.setString(1, status);
        preparedStatement.setInt(2, orderId);
        preparedStatement.executeUpdate();
        return "";
    }

    public static Integer getTotalSumForPerPayType(String payType) throws SQLException {
        if (!payType.equals("")) {
            PreparedStatement preparedStatement = connection.prepareStatement("select sum(total_amount) as sum_per_pay_type from payments where pay_type = ? group by pay_type");
            preparedStatement.setString(1, payType);
            ResultSet resultSet = preparedStatement.executeQuery();
            if (resultSet.next()) {
                return resultSet.getInt("sum_per_pay_type");
            }else {
                return 0;
            }
        } else {
            return 0;
        }
    }

    public static List<ResDataProducts> DataOfProducts() throws SQLException {
        List<ResDataProducts> resDataProducts = new ArrayList<>();
        PreparedStatement preparedStatement = connection.prepareStatement("select p.name,p.price,sum(op.amount) as count_total_prepared,count(*) as count_attended_order " +
                "from order_products op inner join products p on op.product_id = p.id group by p.id order by p.id");
        ResultSet resultSet = preparedStatement.executeQuery();
        while (resultSet.next()) {
            resDataProducts.add(new ResDataProducts(
                    resultSet.getString("name"),
                    resultSet.getString("price"),
                    resultSet.getInt("count_total_prepared"),
                    resultSet.getInt(4)
            ));
        }
        return resDataProducts;
    }

    public static List<ResDataUsers> getDataOfUsers(String token) throws SQLException {
        List<ResDataUsers> resDataUsers = new ArrayList<>();
        PreparedStatement preparedStatement = connection.prepareStatement("select u.first_name,u.last_name,(select sum(total_amount)from payments where user_id = u.id and pay_type = 'CASH' group by pay_type) as total_cash, (select sum(total_amount) from payments  where user_id = u.id and pay_type = 'PAYME' group by pay_type)  as total_payme, (select sum(total_amount) from payments where user_id = u.id and pay_type = 'CLICK' group by pay_type) as total_click, count(*) as count_order,(array_agg(o.ordered_date order by o.ordered_date desc))[1] as last_ordered_date from users u join orders o on u.id = o.user_id group by u.id, u.first_name, u.last_name");
        ResultSet resultSet = preparedStatement.executeQuery();
        while (resultSet.next()) {
            resDataUsers.add(new ResDataUsers(
                    resultSet.getString(1),
                    resultSet.getString(2),
                    resultSet.getInt(3),
                    resultSet.getInt(4),
                    resultSet.getInt(5),
                    resultSet.getInt(6),
                    resultSet.getString(7)
            ));
        }
        return resDataUsers;
    }

    public static List<ResUserForAdmin> getUsersForAdmin() throws SQLException {
        List<ResUserForAdmin> resUserForAdmins = new ArrayList<>();
        PreparedStatement preparedStatement = connection.prepareStatement("SELECT id, first_name,last_name,email,role FROM users ORDER BY id");
        ResultSet resultSet = preparedStatement.executeQuery();
        while (resultSet.next()) {
            resUserForAdmins.add(new ResUserForAdmin(
                    resultSet.getString("id"),
                    resultSet.getString("first_name"),
                    resultSet.getString("last_name"),
                    resultSet.getString("email"),
                    resultSet.getString("role"))
            );
        }
        return resUserForAdmins;
    }

    public static List<String> getRoles() throws SQLException {
        List<String> roles = new ArrayList<>();
        PreparedStatement preparedStatement = connection.prepareStatement("select role from users order by id");
        ResultSet resultSet = preparedStatement.executeQuery();
        while (resultSet.next()) {
            if (!resultSet.getString(1).equals("ROLE_SUPERADMIN")) {
                roles.add(resultSet.getString(1));
            }
        }
        return roles;
    }

    public static void EditUser(ReqUser reqUser, String userId) throws SQLException {
        if (!reqUser.getPassword().equals("")) {
            PreparedStatement preparedStatement = connection.prepareStatement("update users set email=?, password = ?,role=? where id = CAST(? as uuid)");
            preparedStatement.setString(1, reqUser.getEmail());
            preparedStatement.setString(2, reqUser.getPassword());
            preparedStatement.setString(3, reqUser.getRole());
            preparedStatement.setString(4, userId);
            preparedStatement.executeUpdate();
        } else {
            PreparedStatement preparedStatement = connection.prepareStatement("update users set email=?,role=? where id = CAST(? as uuid)");
            preparedStatement.setString(1, reqUser.getEmail());
            preparedStatement.setString(2, reqUser.getRole());
            preparedStatement.setString(3, userId);
            preparedStatement.executeUpdate();
        }
    }

    public static List<Attachment> getAttachments() throws SQLException {
        List<Attachment> attachments = new ArrayList<>();
        PreparedStatement preparedStatement = connection.prepareStatement("select * from attachments");
        ResultSet resultSet = preparedStatement.executeQuery();
        while (resultSet.next()) {
            attachments.add(new Attachment(
                    UUID.fromString(resultSet.getString("id")),
                    resultSet.getString("prefix"),
                    resultSet.getString("name")
            ));
        }
        return attachments;
    }

    public static List<Attachment> getAttachmentPhoto() throws SQLException {
        List<Attachment> attachments = new ArrayList<>();
        PreparedStatement preparedStatement = connection.prepareStatement("select photo_id from products");
        ResultSet resultSet = preparedStatement.executeQuery();
        while (resultSet.next()) {
            attachments.add(new Attachment(
                    UUID.fromString(resultSet.getString("photo_id"))
            ));
        }
        return attachments;
    }

    public static void DelRedunDantFile(List<Attachment> newAtt) throws SQLException {
        for (Attachment attachment : newAtt) {
            PreparedStatement preparedStatement = connection.prepareStatement("delete from attachments where id = CAST(? as uuid)");
            preparedStatement.setString(1, attachment.getId().toString());
            preparedStatement.executeUpdate();
        }
    }

    public static void changeWishlist(Integer id, ReqProduct reqProduct) throws SQLException {
        PreparedStatement preparedStatement = connection.prepareStatement("UPDATE products SET wishlist=? WHERE id=?");
        preparedStatement.setBoolean(1, reqProduct.getWishlist());
        preparedStatement.setInt(2, id);
        preparedStatement.executeUpdate();
    }
}
