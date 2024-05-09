package com.example.demo.Config;

import com.example.demo.Entity.MySecurity;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.SneakyThrows;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.RecursiveTask;

@Configuration
public class Filter extends OncePerRequestFilter {

    List<MySecurity> securities = List.of(
            new MySecurity("ROLE_SUPERADMIN", "/product", "POST"),
            new MySecurity("ROLE_SUPERADMIN", "/product", "DELETE"),
            new MySecurity("ROLE_SUPERADMIN", "/product", "PUT"),
            new MySecurity("ROLE_SUPERADMIN", "/category", "POST"),
            new MySecurity("ROLE_SUPERADMIN", "/category", "DELETE"),
            new MySecurity("ROLE_SUPERADMIN", "/category", "PUT"),
            new MySecurity("ROLE_SUPERADMIN", "/user", "PUT")
    );

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

    @SneakyThrows
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = request.getHeader("token");
        String url = request.getRequestURI();
        String method = request.getMethod();
        List<String> permissions = getPermissions(url, method);
        Boolean isFree = checkFree(permissions);
        if (token == null && isFree) {
            filterChain.doFilter(request, response);
        } else {
            if (isFree) {
                filterChain.doFilter(request, response);
            } else {
                PreparedStatement preparedStatement = connection.prepareStatement("select role from users where id=cast(? as UUID)");
                preparedStatement.setString(1, token);
                ResultSet resultSet = preparedStatement.executeQuery();
                if(resultSet.next()){
                    String userRole = resultSet.getString("role");
                    if (permissions.contains(userRole)) {
                        filterChain.doFilter(request, response);
                    }
                }
            }
        }
    }

    private Boolean checkFree(List<String> permissions) {
        return permissions.get(0).equals("FREE");
    }

    private List<String> getPermissions(String url, String method) {
        List<String> permissions = new ArrayList<>();
        for (MySecurity security : securities) {
            if (security.getMethod().equalsIgnoreCase(method) && security.getUrl().equalsIgnoreCase(url)) {
                permissions.add(security.getRole());
            }
        }
        if (permissions.size() == 0) {
            return List.of("FREE");
        }
        return permissions;
    }
}
