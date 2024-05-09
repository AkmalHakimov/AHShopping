package com.example.demo.Config;


import com.example.demo.Entity.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class AutoRun implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {
        // Database connection parameters
        String url = "jdbc:postgresql://localhost:5432/shopping_db1";
        String username = "postgres";
        String password = "root123";
        String superAdminId = "cc5993de-5130-4409-80b0-d1ee3dfcc4ff";

        try {
            // Load the PostgreSQL JDBC driver
            Class.forName("org.postgresql.Driver");

            // Create a connection to the database
            Connection connection = DriverManager.getConnection(url, username, password);
            Statement statement = connection.createStatement();
            String users = "CREATE TABLE IF NOT EXISTS users ("
                    + "id uuid,"
                    + "first_name varchar,"
                    + "last_name varchar,"
                    + "age integer,"
                    + "email varchar,"
                    + "password varchar,"
                    + "repeat_password varchar,"
                    + "role varchar,"
                    + "photo_id integer)";

            statement.executeUpdate(users);


            PreparedStatement preparedStatement = connection.prepareStatement("select id from users where id = cast(? as uuid)");
            preparedStatement.setString(1,superAdminId);
            ResultSet resultSet = preparedStatement.executeQuery();
            if(resultSet.next()){
                return;
            }
            // Define your SQL create table statement
            String attachments = "CREATE TABLE IF NOT EXISTS attachments ("
                    + "id uuid,"
                    + "prefix VARCHAR(255),"
                    + "name VARCHAR)";

            String categories = "CREATE TABLE IF NOT EXISTS categories ("
                    + "id serial,"
                    + "name VARCHAR)";

            String order_products = "CREATE TABLE IF NOT EXISTS order_products ("
                    + "id serial,"
                    + "order_id integer,"
                    + "product_id integer,"
                    + "amount integer)";

            String orders = "CREATE TABLE IF NOT EXISTS orders ("
                    + "id serial PRIMARY KEY,"
                    + "user_id uuid,"
                    + "ordered_date timestamp,"
                    + "payment_id integer,"
                    + "status varchar)";

            String payments = "CREATE TABLE IF NOT EXISTS payments ("
                    + "id serial PRIMARY KEY,"
                    + "total_amount integer,"
                    + "pay_type varchar,"
                    + "date_time varchar,"
                    + "user_id uuid,"
                    + "amount varchar(255))";

            String products = "CREATE TABLE IF NOT EXISTS products ("
                    + "id serial PRIMARY KEY,"
                    + "name varchar,"
                    + "category_id integer,"
                    + "price integer,"
                    + "description varchar,"
                    + "wishlist boolean,"
                    + "photo_id uuid)";


            PreparedStatement preparedStatement1 = connection.prepareStatement("INSERT INTO users values (cast(? as UUID),?,?,?,?,?,?,?)");
            preparedStatement1.setString(1,superAdminId);
            preparedStatement1.setString(2, "Amin");
            preparedStatement1.setString(3, "Salimov");
            preparedStatement1.setInt(4, 21);
            preparedStatement1.setString(5, "0");
            preparedStatement1.setString(6, "0");
            preparedStatement1.setString(7, "0");
            preparedStatement1.setString(8, Role.ROLE_SUPERADMIN.toString());
            preparedStatement1.executeUpdate();

            // Execute the SQL statement to create the table
            statement.executeUpdate(attachments);
            statement.executeUpdate(categories);
            statement.executeUpdate(order_products);
            statement.executeUpdate(orders);
            statement.executeUpdate(payments);
            statement.executeUpdate(products);

            // Close resources
            statement.close();
            connection.close();
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }
}
