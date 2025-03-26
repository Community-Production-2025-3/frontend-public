import { AppColors } from '@/constants/AppColors';
import { AppStyle } from '@/constants/AppStyle';
import { FlatList, Text, View } from 'react-native';
import { Card } from 'react-native-paper';

export const ColorPalette = () => {
  const colors = AppColors;

  return (
    <>
      <Text style={AppStyle.title}>カラーパレット</Text>
      <Text>Constant Colors</Text>
      <FlatList
        key="constant"
        data={Object.entries(colors.constant)}
        renderItem={({ item }) => (
          <ColorCard key={item[0]} color={item[1]} colorKey={item[0]} />
        )}
        numColumns={3}
        scrollEnabled={false}
      />
      <Text>Light Mode Colors</Text>
      <FlatList
        key="light"
        data={Object.entries(colors.light)}
        renderItem={({ item }) => (
          <ColorCard key={item[0]} color={item[1]} colorKey={item[0]} />
        )}
        numColumns={3}
        scrollEnabled={false}
      />
      <Text>Dark Mode Colors</Text>
      <FlatList
        key="dark"
        data={Object.entries(colors.dark)}
        renderItem={({ item }) => (
          <ColorCard key={item[0]} color={item[1]} colorKey={item[0]} />
        )}
        numColumns={3}
        scrollEnabled={false}
      />
    </>
  );
};

const ColorCard = ({
  colorKey,
  color,
}: {
  colorKey: string;
  color: string;
}) => {
  return (
    <Card
      style={{
        backgroundColor: color,
        width: '30%',
        height: 100,
        margin: 'auto',
        marginBottom: 10,
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: 10,
          padding: 10,
        }}
      >
        <Text>{colorKey}</Text>
      </View>
    </Card>
  );
};
