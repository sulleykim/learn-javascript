# 실시간 웹 애플리케이션을 위한 성능 향상 기법에 대하여

## 데이터베이스 복제

## 캐시 서버

## 로드 밸런싱

하나의 인터넷 서비스가 발생하는 트래픽이 많을 때 여러 대의 서버가 분산처리하여 서버의 로드율 증가, 부하량, 속도저하 등을 고려하여 적절히 분산처리하여 해결해주는 서비스입니다.

### 로드 밸런싱은 왜 필요한가요?

#### Client가 많지 않은 경우

![로드 밸런싱이 필요없는 경우](https://user-images.githubusercontent.com/27342882/47479700-dcf45a80-d868-11e8-8c6b-183fdeaf71ab.JPG)

접속하는 Client가 적으므로 서버는 충분히 대응할 수 있어요!

#### Client가 많은  경우

![로드 밸런싱을 해야하는 경우](https://user-images.githubusercontent.com/27342882/47480215-a1f32680-d86a-11e8-8620-c557771d2615.JPG)

Server는 모든 사람들의 응답을 해주려고 노력하지만 결국엔 지치게 되어 동작을 멈추게 된다.

### 문제 해결을 위해서는?

- **Scale-up** : Server가 더 빠르게 동작하기 위해 하드웨어 성능을 올리는 방법.
- **Scale-out** : 하나의 Server 보다는 여러 대의 Server가 나눠서 일을 하는 방법.

상대적으로 **Scale-out**가 장점이 많으므로 서버를 늘리는 방식으로!

#### Scale-out의 장점은?

- 하드웨어 향상하는 비용보다 서버 한대 추가 비용이 더 적습니다.
- 여러 대의 Server 덕분에 무중단 서비스를 제공할 수 있습니다.

여러 대의 Server에게 균등하게 Traffic을 분산시켜주는 역할을 하는 것이 **Load Balancer**입니다.

![loadbanlancing_](https://user-images.githubusercontent.com/27342882/47480173-7a9c5980-d86a-11e8-826a-5f6b144a0b56.JPG)