
// 声明 PI 常量
const float PI = 3.1415926535897932384626433832795;

uniform vec2 uResolution;
uniform sampler2D uPictureTexture;
uniform sampler2D uDisplacementTexture;
uniform float uTime; // 时间变量
uniform vec3 uRandomSeed; //随机数
attribute float aIntensity;
attribute float aAngle;

varying vec3 vColor;

    // Random function
    float random(float n) {
    return fract(sin(n) * 43758.5453123);
    }   

void main()
{
     // 计算时间因子，用于调整粒子大小
    float timeFactor = abs(sin(uTime * PI / 15.0)); // 每15秒一个周期的正弦波
    
    //随机数
    // 创建一个基于位置的唯一值
    float n = position.x * uRandomSeed.x + position.y * uRandomSeed.y + position.z * uRandomSeed.z;

    // 使用此值生成随机数
    float rand = random(n);

    // 生成随机偏移
    vec3 randomOffset = vec3(random(n + 1.0), random(n + 2.0), random(n + 3.0)) - 0.5;
    float offsetScale = 0.02; // 控制偏移量的大小
    randomOffset *= offsetScale;

    // Displacement
    // Displacement
    vec3 newPosition = position + randomOffset; // 应用随机偏移
    float displacementIntensity = texture(uDisplacementTexture, uv).r;
    displacementIntensity = smoothstep(0.1, 0.8, displacementIntensity);

    vec3 displacement = vec3(
        cos(aAngle) * 0.5,
        sin(aAngle) * 0.5,
        0.5
    );
    displacement = normalize(displacement);
    displacement *= displacementIntensity;
    displacement *= 0.5;
    displacement *= timeFactor;
    displacement *= aIntensity;
    
    newPosition += displacement;

    // Final position
    vec4 modelPosition = modelMatrix * vec4(newPosition, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition*rand*timeFactor;
    gl_Position = projectedPosition;

    // Picture
    float pictureIntensity = texture(uPictureTexture, uv).r;

    // Point size
    gl_PointSize = 0.1 * pictureIntensity * uResolution.y*timeFactor-0.2;
    gl_PointSize *= (1.0 / - viewPosition.z);

    // Varyings
    vColor = vec3(pow(pictureIntensity, 2.0));
}