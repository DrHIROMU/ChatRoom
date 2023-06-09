package drhiromu.chat_room_app_admin;

import de.codecentric.boot.admin.server.config.EnableAdminServer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@EnableAdminServer
@SpringBootApplication
public class ChatRoomAppAdminApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChatRoomAppAdminApplication.class, args);
	}

}
