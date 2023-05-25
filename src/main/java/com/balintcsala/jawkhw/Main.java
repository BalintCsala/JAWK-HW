package com.balintcsala.jawkhw;

import com.balintcsala.jawkhw.entities.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;

public class Main {

    public static void main(String[] args) {
        HashMap<String, String> properties = getProperties();

        EntityManagerFactory emf = Persistence.createEntityManagerFactory("default", properties);
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        em.persist(new User(true, "balint", "Bálint", "6f7a1d8bf41239002cf84f385ab6997fe8095c51da713f8e88f1bc33f8b8fa1c"));
        em.getTransaction().commit();
        em.close();
        emf.close();
    }

    private static HashMap<String, String> getProperties() {
        String pass = "";
        try {
            BufferedReader reader = new BufferedReader(new FileReader(".env"));
            pass = reader.readLine();
        } catch (IOException e) {
            System.err.println("Please create a .env file in the root directory of the project.");
            System.exit(1);
        }

        HashMap<String, String> properties = new HashMap<>();
        properties.put("javax.persistence.jdbc.password", pass);
        return properties;
    }

}
