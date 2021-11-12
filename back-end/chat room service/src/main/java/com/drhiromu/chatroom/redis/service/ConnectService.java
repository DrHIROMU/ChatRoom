package com.drhiromu.chatroom.redis.service;

import com.drhiromu.chatroom.redis.thread.CalculatorThread;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.stereotype.Service;

@Service
public class ConnectService {
    public void connectToUser(){
        ThreadPoolTaskExecutor taskExecutor = new ThreadPoolTaskExecutor();
        taskExecutor.setQueueCapacity(20);
        taskExecutor.setCorePoolSize(3);
        taskExecutor.setMaxPoolSize(10);
        taskExecutor.setKeepAliveSeconds(30000);
        taskExecutor.initialize();

        Integer[] num1Array = {4,5,22,62,3,64,12,75,32,5,45};
        Integer[] num2Array = {8,3,2,86,14,5,26,34,66,73,2};

        for(int i=0; i<num1Array.length; i++){
            Thread calThread = new Thread(new CalculatorThread(num1Array[i], num2Array[i]));
            taskExecutor.execute(calThread);
            int count = taskExecutor.getActiveCount();
            System.out.printf("COUNT: %d\n", count);
        }
    }
}
