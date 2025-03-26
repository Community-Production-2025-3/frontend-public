import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { Link } from 'expo-router';
import { Schedule } from '@/types/schedule';
import { useAppColors } from '@/hooks/useAppColors';
import { formatISODateJSTSimple } from '@/utils/formatDate';
import { styles as sharedStyles } from '../style';

interface ScheduleItemProps {
  schedule: Schedule;
}

export const ScheduleItem: React.FC<ScheduleItemProps> = ({ schedule }) => {
  const { modeColors } = useAppColors();
  const theme = useTheme();

  const formattedDate = formatISODateJSTSimple(schedule.created_at);

  return (
    <View style={itemStyles.container}>
      <Link href={`/schedule/${schedule.id}`} asChild>
        <Card
          style={[
            sharedStyles.card,
            itemStyles.card,
            {
              backgroundColor:
                modeColors.cardBackground || theme.colors.elevation.level2,
            },
          ]}
          mode="elevated"
        >
          <Card.Content style={sharedStyles.cardContent}>
            <View style={sharedStyles.textContainer}>
              <Text
                variant="titleMedium"
                style={[sharedStyles.title, { color: modeColors.text }]}
              >
                {schedule.title}
              </Text>
              <Text
                variant="bodySmall"
                style={[sharedStyles.date, { color: modeColors.textSecondary }]}
              >
                {formattedDate}
              </Text>
            </View>
          </Card.Content>
        </Card>
      </Link>
    </View>
  );
};

const itemStyles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    width: '100%',
  },
  card: {
    margin: 0,
  },
});
