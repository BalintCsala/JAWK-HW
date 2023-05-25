package com.balintcsala.jawkhw;

import com.balintcsala.jawkhw.entities.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

public class Main {

    public static void main(String[] args) {
        EntityManagerFactory emf = Persistence.createEntityManagerFactory("default");
        EntityManager em = emf.createEntityManager();
        em.getTransaction().begin();
        em.persist(new User(true, "balint", "Bálint", "6f7a1d8bf41239002cf84f385ab6997fe8095c51da713f8e88f1bc33f8b8fa1c"));
        em.getTransaction().commit();
        em.close();
        emf.close();
    }

}
