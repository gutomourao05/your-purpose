import * as Notifications from 'expo-notifications';
function createNotifications(startDate: string, endDate: string, title: string, body: string) {
    const notifications = [];
    const inicio = new Date(startDate);
    const fim = new Date(endDate);

    let dia = inicio;

    do {
        notifications.push({
            date: dia.toISOString(),
            title: title,
            body: body
        });
        dia.setDate(dia.getDate() + 1);
    } while (inicio <= fim);

    return notifications;
}

const saveNotifications = async (startDate: string, endDate: string, title: string, body: string) => {
    const arrayNotification = createNotifications(startDate, endDate, title, body);
    const arrayNotificationId = [];

    for (const notification of arrayNotification) {
        let date = new Date(notification.date);
        date.setHours(date.getHours() + 3);

        try {
            const idNotification = await Notifications.scheduleNotificationAsync({
                content: {
                    title: notification.title,
                    body: notification.body,
                    data: { date: notification.date },
                },
                trigger: {
                    date,

                },
            });

            arrayNotificationId.push(idNotification);

        }
        catch (error) { }
    }

    return arrayNotificationId;
};

const removeNotifications = async (id: string) => {
    await Notifications.cancelScheduledNotificationAsync(id);
};

const requestNotificationPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        if (newStatus !== 'granted') {
            alert('As permissões de notificação não foram concedidas!');
        } else {
            alert('Permissão de notificação concedida!');
        }
    }
};

export { saveNotifications, removeNotifications, requestNotificationPermissions };